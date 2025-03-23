import { closeSnackbar, enqueueSnackbar, SnackbarMessage, SnackbarProvider, VariantType } from "notistack";

const showSnackbar = (message: SnackbarMessage, variant: VariantType = 'default', anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' }) => {
    enqueueSnackbar(message, {
        variant,
        autoHideDuration: 5000,
        anchorOrigin: anchorOrigin ?? { vertical: 'bottom', horizontal: 'center' },
    });
};

const dismissSnackbar = (key?: string | number) => {
    closeSnackbar(key);
};

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            hideIconVariant
        >
            {children}
        </SnackbarProvider>
    );
};

export { dismissSnackbar, showSnackbar, NotificationProvider }