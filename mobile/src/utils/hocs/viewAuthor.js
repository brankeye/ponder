import { compose, withHandlers, lifecycle } from 'recompose';
import { withAuthorViewMutation } from '@@graphql';

const withViewPoem = compose(
  withAuthorViewMutation,
  withHandlers({
    viewAuthor: props => async () => {
      const { author, updateView } = props;
      if (author) {
        await updateView(author.id);
      }
    },
  }),
  lifecycle({
    async componentDidMount() {
      await this.props.viewAuthor();
    },
    async componentDidUpdate(prevProps) {
      const { author } = this.props;
      if (author && prevProps.author.id !== author.id) {
        await this.props.viewAuthor();
      }
    },
  })
);

export default withViewPoem;
