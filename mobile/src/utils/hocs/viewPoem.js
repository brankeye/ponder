import { compose, withHandlers, lifecycle } from 'recompose';
import { withPoemViewMutation } from '@@graphql';

const withViewPoem = compose(
  withPoemViewMutation,
  withHandlers({
    viewPoem: props => async () => {
      const { poem, updateView } = props;
      if (poem) {
        await updateView(poem.id);
      }
    },
  }),
  lifecycle({
    async componentDidMount() {
      await this.props.viewPoem();
    },
    async componentDidUpdate(prevProps) {
      const { poem } = this.props;
      if (poem && prevProps.poem.id !== poem.id) {
        await this.props.viewPoem();
      }
    },
  })
);

export default withViewPoem;
