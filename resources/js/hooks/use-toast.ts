import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'destructive';

export type Toast = {
    id: string;
    title?: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
    variant?: ToastVariant;
    duration?: number;
    open?: boolean;
};

type ToastState = {
    toasts: Toast[];
};

type ToastAction =
    | { type: 'ADD_TOAST'; toast: Toast }
    | { type: 'UPDATE_TOAST'; toast: Partial<Toast> & { id: string } }
    | { type: 'DISMISS_TOAST'; toastId?: string }
    | { type: 'REMOVE_TOAST'; toastId?: string };

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 300;

const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
    if (toastTimeouts.has(toastId)) {
        return;
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        dispatch({ type: 'REMOVE_TOAST', toastId });
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeout);
};

const reducer = (state: ToastState, action: ToastAction): ToastState => {
    switch (action.type) {
        case 'ADD_TOAST':
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            };
        case 'UPDATE_TOAST':
            return {
                ...state,
                toasts: state.toasts.map((toast) =>
                    toast.id === action.toast.id
                        ? { ...toast, ...action.toast }
                        : toast,
                ),
            };
        case 'DISMISS_TOAST': {
            const { toastId } = action;

            if (toastId) {
                addToRemoveQueue(toastId);
            } else {
                state.toasts.forEach((toast) => addToRemoveQueue(toast.id));
            }

            return {
                ...state,
                toasts: state.toasts.map((toast) =>
                    toastId === undefined || toast.id === toastId
                        ? { ...toast, open: false }
                        : toast,
                ),
            };
        }
        case 'REMOVE_TOAST':
            if (action.toastId === undefined) {
                return { ...state, toasts: [] };
            }

            return {
                ...state,
                toasts: state.toasts.filter(
                    (toast) => toast.id !== action.toastId,
                ),
            };
        default:
            return state;
    }
};

const dispatch = (action: ToastAction) => {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener) => listener(memoryState));
};

let count = 0;
const generateId = () => `${Date.now()}-${count++}`;

export const toast = ({
    duration = 4000,
    ...props
}: Omit<Toast, 'id' | 'open'>) => {
    const id = generateId();

    dispatch({
        type: 'ADD_TOAST',
        toast: {
            ...props,
            id,
            open: true,
        },
    });

    if (Number.isFinite(duration) && duration > 0) {
        setTimeout(() => {
            dispatch({ type: 'DISMISS_TOAST', toastId: id });
        }, duration);
    }

    return {
        id,
        dismiss: () => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
        update: (toastProps: Partial<Toast>) =>
            dispatch({
                type: 'UPDATE_TOAST',
                toast: { ...toastProps, id },
            }),
    };
};

export const useToast = () => {
    const [state, setState] = useState(memoryState);

    useEffect(() => {
        listeners.push(setState);
        return () => {
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, []);

    return {
        ...state,
        toast,
        dismiss: (toastId?: string) =>
            dispatch({ type: 'DISMISS_TOAST', toastId }),
    };
};
