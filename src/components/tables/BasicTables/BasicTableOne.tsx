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
import { useSearch } from "../../../hooks/useSearch";
import { usePagination } from "../../../hooks/usePagination";
import { sortData } from "../../../utils/sortData";
import { EmptyState } from "../../common/empty-state";
import { TableLoader } from "../../common/table-loader";
import type { SortConfig } from "../../../types/table.types";

interface Order {
  [key: string]: unknown;
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  status: string;
  budget: string;
}

const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Aarav Sharma",
      role: "Frontend Developer",
    },
    projectName: "E-Commerce Website",
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Priya Patel",
      role: "Project Manager",
    },
    projectName: "ERP System",
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-19.jpg",
      name: "Rahul Verma",
      role: "Content Writer",
    },
    projectName: "Corporate Blog",
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Sneha Iyer",
      role: "Digital Marketing Specialist",
    },
    projectName: "Social Media Campaign",
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Vikram Singh",
      role: "Full Stack Developer",
    },
    projectName: "Business Website",
    budget: "4.5K",
    status: "Active",
  },
  {
    id: 6,
    user: {
      image: "/images/user/user-22.jpg",
      name: "Ananya Desai",
      role: "UI/UX Designer",
    },
    projectName: "Mobile App Design",
    budget: "6.2K",
    status: "Pending",
  },
  {
    id: 7,
    user: {
      image: "/images/user/user-23.jpg",
      name: "Rohan Mehta",
      role: "Backend Developer",
    },
    projectName: "API Development",
    budget: "8.4K",
    status: "Active",
  },
  {
    id: 8,
    user: {
      image: "/images/user/user-24.jpg",
      name: "Neha Joshi",
      role: "QA Engineer",
    },
    projectName: "Testing Automation",
    budget: "5.1K",
    status: "Pending",
  },
];

export default function BasicTableOne() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [isLoading] = useState(false);

  // Search
  const { search, setSearch, filteredData } = useSearch<Order>({
    data: tableData,
    searchKeys: ["user.name", "user.role", "projectName", "status", "budget"],
    debounceDelay: 300,
  });

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
  } = usePagination(sortedData, { initialPage: 1, initialPageSize: 10 });

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Deleted order:", deleteId);
    setIsDeleting(false);
    closeDelete();
  }, [deleteId, closeDelete]);

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

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <SearchInput
          placeholder="Search orders..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
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
          Filter
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <th
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer select-none"
                  onClick={() => toggleSort("user.name")}
                >
                  User{getSortIndicator("user.name")}
                </th>
                <th
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer select-none"
                  onClick={() => toggleSort("projectName")}
                >
                  Project Name{getSortIndicator("projectName")}
                </th>
                <th
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer select-none"
                  onClick={() => toggleSort("status")}
                >
                  Status{getSortIndicator("status")}
                </th>
                <th
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer select-none"
                  onClick={() => toggleSort("budget")}
                >
                  Budget{getSortIndicator("budget")}
                </th>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {isLoading ? (
                <TableLoader rows={5} columns={5} avatar actions />
              ) : currentData.length === 0 ? (
                <TableRow>
                  <td colSpan={5} className="px-0 py-0">
                    <EmptyState
                      title="No results found"
                      description={
                        search
                          ? `No orders match "${search}". Try a different search term.`
                          : "There are no orders to display at the moment."
                      }
                    />
                  </td>
                </TableRow>
              ) : (
                currentData.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img
                            width={40}
                            height={40}
                            src={order.user.image}
                            alt={order.user.name}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {order.user.name}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {order.user.role}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.projectName}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          order.status === "Active"
                            ? "success"
                            : order.status === "Pending"
                              ? "warning"
                              : "error"
                        }
                      >                                                                                 
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {order.budget}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <button
                        onClick={() => openDelete(order.id)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-error-500 transition-colors"
                      >
                        <TrashBinIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
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