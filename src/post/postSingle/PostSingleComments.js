import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import CommentForm from '../../comments/CommentForm';
import Comments from '../../comments/Comments';
import './PostSingleComments.scss';

export default class PostSingleComments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.openCommentingDraft();
  }

  render() {
    const { content } = this.props;
    return (
      <div className="PostSingleComments pt-5">
        <div className="container">
          <h1>
            <FormattedMessage id="comments" />{' '}
            <span className="text-info">{content.children}</span>
          </h1>

          <CommentForm embedded />

          {content.children > 0 &&
            <Comments
              postId={content.id}
              show
              isSinglePage
            />
          }
        </div>
      </div>
    )
  }
}