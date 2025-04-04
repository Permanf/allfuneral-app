export function DateFormatter(str: string){
    const date = new Date(str);

    const formattedDate = [
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
        date.getFullYear()
    ].join(".");

    return formattedDate
}

