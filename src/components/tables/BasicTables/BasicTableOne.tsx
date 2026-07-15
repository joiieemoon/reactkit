import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useState, useMemo, useCallback } from "react";
import Badge from "../../ui/badge/Badge";
import Pagination from "../../common/pagination";
import { TrashBinIcon } from "../../../icons";
import { DeleteConfirmationModal } from "../../ui/confirmation-modal";
import { SearchInput } from "../../ui/search-input";
import { usePagination } from "../../../hooks/usePagination";
import { sortData } from "../../../utils/sortData";
import { EmptyState } from "../../common/empty-state";
import { TableLoader } from "../../common/table-loader";
import type { SortConfig } from "../../../types/table.types";
import { useUsers } from "../../../api/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../../api/services";
import { USER_QUERY_KEYS } from "../../../api/query";
import { toastSuccess, toastError } from "../../common/toast";
import { User, UserQueryParams } from "../../../api/types";
import { Virtuoso } from "react-virtuoso";

export default function BasicTableOne() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterParams, setFilterParams] = useState<UserQueryParams>({
    limit: 10,
    offset: 0,
  });

  // Fetch users from API with search/filter params
  const { data, isLoading, error, refetch } = useUsers(filterParams);

  // Delete mutation
  const queryClient = useQueryClient();
  const { mutate: deleteUserMutation } = useMutation({
    mutationKey: USER_QUERY_KEYS.ALL,
    mutationFn: async (id: number) => {
      await deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.ALL });
      toastSuccess("User deleted successfully!");
    },
    onError: () => {
      toastError("Failed to delete user. Please try again.");
    },
  });

  // Get users array from API response
  const users: User[] = data?.users || [];

  // Handle search - use client-side search on fetched data
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setFilterParams((prev) => ({
      ...prev,
      offset: 0, // Reset to first page on search
    }));
  }, []);

  // Client-side filtering for search
  const filteredData = useMemo(() => {
    if (!searchQuery) return users;
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [users, searchQuery]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return sortData(filteredData, sortConfig);
  }, [filteredData, sortConfig]);

  // Pagination
  const {
    page,
    pageSize,
    setPage,
    changePageSize,
    currentData,
    totalPages,
    totalItems,
  } = usePagination(sortedData, { initialPage: 1, initialPageSize: 5 });

  const openDelete = useCallback((id: number) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  }, []);

  const closeDelete = useCallback(() => {
    setIsDeleteOpen(false);
    setDeleteId(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (deleteId === null) return;
    setIsDeleting(true);
    try {
      deleteUserMutation(deleteId);
    } finally {
      setIsDeleting(false);
      closeDelete();
    }
  }, [deleteId, closeDelete, deleteUserMutation]);

  const toggleSort = useCallback((field: string) => {
    setSortConfig((prev) => {
      if (prev?.field === field) {
        return prev.direction === "asc"
          ? { field, direction: "desc" }
          : null;
      }
      return { field, direction: "asc" };
    });
  }, []);

  const getSortIndicator = (field: string) => {
    if (sortConfig?.field !== field) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  // Get status based on user role
  const getUserStatus = (role: string): "Active" | "Pending" | "Cancel" => {
    if (role === "admin") return "Active";
    if (role === "moderator") return "Pending";
    return "Cancel";
  };

  // Get badge color based on status
  const getBadgeColor = (status: string): "success" | "warning" | "error" => {
    if (status === "Active") return "success";
    if (status === "Pending") return "warning";
    return "error";
  };

  // Render table row for virtualization
  const renderTableRow = (user: User) => (
    <TableRow key={user.id}>
      <TableCell className="px-5 py-4 sm:px-6 text-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              width={40}
              height={40}
              src={user.avatar}
              alt={user.name}
            />
          </div>
          <div>
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {user.name}
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              {user.creationAt}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {user.email}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {user.role}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        <Badge
          size="sm"
          color={getBadgeColor(getUserStatus(user.role))}
        >
          {getUserStatus(user.role)}
        </Badge>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        <button
          onClick={() => openDelete(user.id)}
          className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-error-500 transition-colors"
        >
          <TrashBinIcon className="w-5 h-5" />
        </button>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <SearchInput
          placeholder="Search users..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          <svg
            className="stroke-current fill-white dark:fill-gray-800"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.29004 5.90393H17.7067"
              stroke=""
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.7075 14.0961H2.29085"
              stroke=""
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
              fill=""
              stroke=""
              strokeWidth="1.5"
            />
            <path
              d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
              fill=""
              stroke=""
              strokeWidth="1.5"
            />
          </svg>
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 text-red-500 bg-red-50 rounded-lg">
          Failed to load users. Please try again.
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <th
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer select-none"
                  onClick={() => toggleSort("name")}
                >
                  User{getSortIndicator("name")}
                </th>
                <th
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer select-none"
                  onClick={() => toggleSort("email")}
                >
                  Email{getSortIndicator("email")}
                </th>
                <th
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer select-none"
                  onClick={() => toggleSort("role")}
                >
                  Role{getSortIndicator("role")}
                </th>
                <th
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer select-none"
                >
                  Status
                </th>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body with Virtuoso Virtualization */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {isLoading ? (
                <TableLoader rows={5} columns={5} avatar actions />
              ) : currentData.length === 0 ? (
                <TableRow>
                  <td colSpan={5} className="px-0 py-0">
                    <EmptyState
                      title="No results found"
                      description={
                        searchQuery
                          ? `No users match "${searchQuery}". Try a different search term.`
                          : "There are no users to display at the moment."
                      }
                    />
                  </td>
                </TableRow>
              ) : (
                <Virtuoso
                  style={{ height: "400px", width: "100%" }}
                  data={currentData}
                  itemContent={(_, user) => renderTableRow(user)}
                />
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {!isLoading && currentData.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
          onPageSizeChange={changePageSize}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </>
  );
}