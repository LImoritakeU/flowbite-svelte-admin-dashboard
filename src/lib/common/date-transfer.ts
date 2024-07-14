
export const transformMinguoDateToAd = (minguoDate: string): string => {
    const year = parseInt(minguoDate.substring(0, 3)) + 1911;
    const month = parseInt(minguoDate.substring(3, 5));
    const day = parseInt(minguoDate.substring(5, 7));

    return new Date(year, month - 1, day).toISOString().substring(0,10);;
};

export const transformAdDateToMinguo = (adDate: Date): string => {
    const year = adDate.getFullYear() - 1911;
    const month = adDate.getMonth() + 1;
    const day = adDate.getDate();

    return `${year.toString().padStart(3, '0')}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
}