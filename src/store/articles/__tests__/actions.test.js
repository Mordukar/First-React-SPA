import * as actions from "../actions";
import { PUBLIC_URL } from "../../../utils/variables";

const {
  getArticlesPending,
  GET_ARTICLES_PENDING,
  getArticles,
  getArticlesSuccess
} = actions;

describe('articles actions', () => {
  it('getArticlesPending returns and action with type', () => {
    const expected = {
      type: GET_ARTICLES_PENDING
    };
    const received = getArticlesPending();

    expect(expected).toEqual(received);
  });

  describe("getArticles", () => {
    it('calls dispatch with getArticlesPending()', async () => {
      const mockDispatch = jest.fn();
  
      // eslint-disable-next-line no-undef
      fetchMock.mockOnce(
        JSON.stringify("the next call to fetch will always return this as the body")
      );
  
      await getArticles()(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(getArticlesPending());
    });

    it("calls fetch with PUBLIC_URL", async () => {
      const mockDispatch = jest.fn();

      // eslint-disable-next-line no-undef
      fetchMock.mockOnce(
        JSON.stringify(
          "the next call to fetch will always return this as the body"
        )
      );

      await getArticles()(mockDispatch);

      // eslint-disable-next-line no-undef
      expect(fetchMock).toHaveBeenCalledWith(PUBLIC_URL);
    });

    it("calls dispatch with getArticles success with result from fetch", async () => {
      const mockDispatch = jest.fn();
      const result = ['article']

      // eslint-disable-next-line no-undef
      fetchMock.mockOnce(
        JSON.stringify(result)
      );

      await getArticles()(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenLastCalledWith(getArticlesSuccess(result));
    });
  });

});