'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { pink } from '@mui/material/colors';

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ open, onClose, onConfirm }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          backgroundColor: '#540707',
          color: '#f2ebdf',
          textAlign: 'center',
          fontFamily: '"Permanent Marker", cursive'
        }}
      >
        💔 Are You Sure?
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: '#7b1e1e',
          color: '#f2ebdf',
          textAlign: 'center'
        }}
      >
        <Typography variant="body1">
          Do you really want to let go of this beautiful memory? 😢
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ backgroundColor: '#7b1e1e', justifyContent: 'center', paddingBottom: 2 }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: '#f2ebdf',
            borderColor: pink[100],
            '&:hover': { backgroundColor: pink[100], color: '#540707' }
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            backgroundColor: pink[200],
            color: '#540707',
            '&:hover': { backgroundColor: pink[100] }
          }}
          variant="contained"
        >
          Delete Memory
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;