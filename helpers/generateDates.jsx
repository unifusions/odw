
const generateDates = () => {
    return Array.from({ length: 60 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i+1);
        return {
            fullDate: date.toDateString(),
            day: date.toLocaleDateString("en-US", { weekday: "short" }), // "Mon", "Tue"
            dateNum: String(date.getDate()).padStart(2, '0'),
            month: date.toLocaleDateString("en-US", { month: "short" }), // "Jan", "Feb"

        };
    });
};

export default generateDates;

