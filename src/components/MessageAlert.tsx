import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { useAlertStore } from '@/stores/useAlertStore';

const MessageAlert = () => {
  const { isOpen, title, description, onConfirm, closeAlert } = useAlertStore();

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeAlert();
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={closeAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> {title} </AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeAlert}>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>確定</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MessageAlert;
