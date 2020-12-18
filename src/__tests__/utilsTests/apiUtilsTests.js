import { convertParamsToString, formatToDateWithSubtractedDays } from '../../utils/apiUtils';

describe('apiUtils', () => {
    describe('formatToDateWithDaysFromToday', () => {
        it('should return formatted today date when no parameter', () => {
            const formattedTodayDate = new Date().toISOString().slice(0, 10);
            expect(formatToDateWithSubtractedDays()).toBe(formattedTodayDate);
        });
        it('should return formatted today date when parameter is 0', () => {
            const formattedTodayDate = new Date().toISOString().slice(0, 10);
            expect(formatToDateWithSubtractedDays(0)).toBe(formattedTodayDate);
        });
        it('should return formatted today date with subtracted days when parameter is greater than 0', () => {
            const numberOfDays = 1;
            const previousDay = new Date();
            previousDay.setDate(previousDay.getDate() - numberOfDays);
            expect(formatToDateWithSubtractedDays(numberOfDays)).toBe(previousDay.toISOString().slice(0, 10));
        });
    });

    describe('convertParamsToString', () => {
        it('should contain only api-key when no parameters are not inserted', () => {
            const params = convertParamsToString();
            expect(params).toContain('api-key');
            expect(params).not.toContain('q');
            expect(params).not.toContain('page');
        });
        it('should not contain page when pageNumber are not used', () => {
            const params = convertParamsToString(true, null, 'abc123');
            expect(params).not.toContain('page');
        });
        it('should not contain page when pageNumber is 0', () => {
            const params = convertParamsToString(true, 0, 'abc123');
            expect(params).not.toContain('page');
        });
        it('should not contain q when phrase is null or undefined or empty string', () => {
            const params1 = convertParamsToString(true, 0, null);
            expect(params1).not.toContain('q');
            const params2 = convertParamsToString(true, 0, undefined);
            expect(params2).not.toContain('q');
        });
        it('should not contain q when phrase is empty string', () => {
            const params = convertParamsToString(true, 0, '');
            expect(params).not.toContain('q');
        });
    });
});
