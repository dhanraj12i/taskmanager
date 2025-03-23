export type SnackbarVariant = "success" | "error" | "info" | "warning";

export interface OperationMessage {
  variant: SnackbarVariant;
  msg: (
    subject: string,
    additionalData?: Record<string, string | number>
  ) => string;
}

export interface SnackbarConfig {
  add: OperationMessage;
  edit: OperationMessage;
  delete: OperationMessage;
  update: OperationMessage;
}

export interface SnackbarMessages {
  success: SnackbarConfig;
  error: SnackbarConfig;
  info: SnackbarConfig;
  warning?: SnackbarConfig;
}

type Operation = "add" | "edit" | "delete" | "update";

// Shared lookup for operation text per variant.
const operationActions: Record<
  Operation,
  { success: string; error: string; info: string; warning: string }
> = {
  add: {
    success: "was created successfully",
    error: "Failed to add",
    info: "has been added",
    warning: "Addition encountered issues",
  },
  edit: {
    success: "was updated successfully",
    error: "Failed to update",
    info: "has been updated",
    warning: "Update encountered issues",
  },
  delete: {
    success: "was deleted successfully",
    error: "Failed to delete",
    info: "has been deleted",
    warning: "Deletion encountered issues",
  },
  update: {
    success: "was updated successfully",
    error: "Failed to update",
    info: "has been updated",
    warning: "Update encountered issues",
  },
};

const createMessage = (operation: Operation, variant: SnackbarVariant) => {
  return (
    subject: string,
    additionalData?: Record<string, string | number>
  ): string => {
    const actionText = operationActions[operation][variant];
    if (variant === "error") {
      return `${actionText} ${subject}.${
        additionalData?.detail ? " " + additionalData.detail : ""
      }`;
    }
    return `${subject} ${actionText}.${
      additionalData?.detail ? " " + additionalData.detail : ""
    }`;
  };
};

const createSnackbarConfig = (variant: SnackbarVariant): SnackbarConfig => ({
  add: { variant, msg: createMessage("add", variant) },
  edit: { variant, msg: createMessage("edit", variant) },
  delete: { variant, msg: createMessage("delete", variant) },
  update: { variant, msg: createMessage("update", variant) },
});

export const snackbarMessages: SnackbarMessages = {
  success: createSnackbarConfig("success"),
  error: createSnackbarConfig("error"),
  info: createSnackbarConfig("info"),
  warning: createSnackbarConfig("warning"),
};
