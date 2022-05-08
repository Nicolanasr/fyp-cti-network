interface year_month_days {
    year: number;
    month: number;
    days: number;
}

export function timeSince(date: Date) {
    var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return date.toLocaleDateString();
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return date.toLocaleDateString();
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

export const getCookie = (name: string): string | undefined => {
    const value: string = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(";").shift();
};

export const formatSizeUnits = (bytes: number): string => {
    if (bytes >= 1073741824) {
        return (bytes / 1073741824).toFixed(2) + " GB";
    } else if (bytes >= 1048576) {
        return (bytes / 1048576).toFixed(2) + " MB";
    } else if (bytes >= 1024) {
        return (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes > 1) {
        return bytes + " bytes";
    } else if (bytes == 1) {
        return bytes + " byte";
    } else {
        return "0 byte";
    }
};
