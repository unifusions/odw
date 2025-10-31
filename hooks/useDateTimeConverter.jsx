export default function useDateTimeConverter({ dateTimeString }) {
    const convertDateTime = (dateTimeStr) => {
        if (!dateTimeStr) {
            console.log("empty string")
            return '';
        }

        try {
            const date = new Date(dateTimeStr);

            // Options for formatting the date
            const dateFormatterOptions = {
                month: 'short', // Abbreviated month name (e.g., Aug)
                day: 'numeric',   // Day of the month (e.g., 17)
                year: 'numeric',  // Four-digit year (e.g., 2020)
            };
            const dateFormatter = new Intl.DateTimeFormat('en-US', dateFormatterOptions);
            const formattedDatePart = dateFormatter.format(date);

            // Options for formatting the time (without seconds)
            const timeFormatterOptions = {
                hour: 'numeric',   // Hour (12-hour format)
                minute: 'numeric', // Minute
                hour12: true,      // Use 12-hour format
            };
            const timeFormatter = new Intl.DateTimeFormat('en-US', timeFormatterOptions);
            const formattedTimePart = timeFormatter.format(date);

            // Get the time zone offset in minutes
            const offsetMinutes = date.getTimezoneOffset();
            const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
            const offsetSign = offsetMinutes < 0 ? '+' : '-';
            const timeZoneAbbreviation = `GMT${offsetSign}${offsetHours}`; // Basic approximation

            return `${formattedDatePart} | ${formattedTimePart}`;
        } catch (error) {
            console.error("Error converting date:", error);
            return 'Invalid Date';
        }
    };


    const formattedDateTime = convertDateTime(dateTimeString);

    return (
        <>
        {dateTimeString}
            {formattedDateTime}
        </>
    );

}