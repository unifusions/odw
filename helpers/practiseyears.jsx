
const practiseYearCalculator = (dateString) => {
    const givenDate = new Date(dateString);
    const today = new Date();

    let years = today.getFullYear() - givenDate.getFullYear();

    // Adjust if today's month/day is before the given date's month/day
    const hasNotHadBirthdayThisYear =
        today.getMonth() < givenDate.getMonth() ||
        (today.getMonth() === givenDate.getMonth() && today.getDate() < givenDate.getDate());

    if (hasNotHadBirthdayThisYear) {
        years--;
    }

    return years;
}

export {practiseYearCalculator};