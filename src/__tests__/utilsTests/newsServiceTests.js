import { getAllNews } from '../../utils/newsService';

describe('newsService', () => {
    beforeEach(() => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => ({
                response: {
                    results: [1, 2, 3],
                },
            }),
        }));
    });
    describe('getAllNews', () => {
        it('should return response with three items', async () => {
            const response = await getAllNews();
            expect(response).toBeTruthy();
            expect(response.results.length).toBe(3);
        });
    });
});
