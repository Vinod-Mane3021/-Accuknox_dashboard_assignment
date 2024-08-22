"use client";

import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm, UseConfirmTypes } from "@/hooks/use-confirm";

const deleteCategoryDialogProps: UseConfirmTypes = {
  title: "Are you absolutely sure?",
  message: "This action cannot be undone. This will permanently delete your widget from our servers.",
  confirmButtonLabel: "Yes, delete widget",
  type: "alert",
};

type ActionsProps = {
  onConfirm: () => void;
};

const Actions = ({ onConfirm }: ActionsProps) => {

  const [ ConfirmationDialog, confirm ] = useConfirm(deleteCategoryDialogProps);
  

  const handleDelete = async () => {
    const isConfirm = await confirm()
    if(isConfirm) {
      onConfirm()
    }
  }

  return (
    <>
      <ConfirmationDialog/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal size={16} className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem disabled={false} onClick={handleDelete}>
            <Trash size={16} className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
