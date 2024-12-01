    // Helper function to format ISO date strings to local date-time
   export const formatToLocal = (isoDate: string): string => {
        const date = new Date(isoDate);
        return date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };