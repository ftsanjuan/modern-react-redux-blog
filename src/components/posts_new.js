import React, { Component } from 'react';
// reduxForm is like the 'connect' helper from react-redux
// it allows our component to talk to the redux store.
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  // this renderer must be passed a reference to the <Field>
  // so that the <input> in which the User is typing can be
  // connected to <Field> and all of ReduxForm event handlers
  // can be fired accordingly.
  renderField(field) {
    // the {...field.input} below passes the props in the field.input
    // object as props to the <input>, so we don't have to type
    // a bunch of things like: onClick={field.input.onClick} onChange={field.input.onChange}
    // ... etc., those will all just be applied as props

    // also recall 3 states on each form:
    // pristine: untouched, freshly rendered field
    // touched: user has interacted with it and focused away from it
    // invalid: field has an error
    // 'touched' state is accessible from field.meta.touched

    /// below is an example of destructuring (pulling properties outside of an object)
    // and assigning them as separate consts/vars.
    // i.e. { meta: {touched, error} } = field  is ===
    //   const touched = field.meta.touched
    //   const error = field.meta.error
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error :  ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      // callback:
      // navigates the user back to /
      this.props.history.push('/');
    });
  }

  render() {
    // recall that connecting redux form via the reduxForm()
    // function call at the bottom of this file adds properties to this component
    // one of which is handleSubmit. The line below extracts
    // that property (a function) and assigns it to the const handleSubmit.
    // Note that handleSubmit is only called after redux-form determines
    // that the form is error-free and ready to be submitted.
    const { handleSubmit } = this.props;

    // Recall that the onSubmit will be called in a different context than
    // the component itself, so we will need to bind onSubmit to the correct context.
    // Calling this.onSubmit.bind(this) ensures that we are binding the correct
    // context to the onSubmit function we define above, namely, that the
    // "this" (used within onSubmit) would still refer to the context of this component.
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

// values is an object containing all the
// values that the user has entered into the form
// { title: 'asdfasdf', categories: 'asdfsdaf', content: 'asdfdsaf' }
function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  // adding a property name that matches the name property
  // of the <Field> component will automatically populate
  // that <Field>'s meta.error property.
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }

  // if errors is empty, the form is fine to submit.
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

// the 'form' is like the name of this form, it must be unique.
// note the 'validate' option is expanded to:  validate: validate
// which simplifies to just:  validate

// note also we are including both reduxForm and connect as the default
// as the default export.
// connect() will return a valid component that can be passed
// to reduxForm(), and this is generally how you would nest both calls.
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);