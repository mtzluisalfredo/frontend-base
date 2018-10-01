### Modal

```jsx
  const showModal = () => setState({ showModal: true });
  const closeModal = () => setState({ showModal: false });

  <div id="modal-root">
    <button onClick={showModal}>Open Modal</button>
    {state.showModal && (
      <Modal
        id="modal-demo"
        title="Modal Title"
        onClose={closeModal}
        footer={(
          <div>
            <button onClick={closeModal}>Close</button>
            <button>Continue</button>
          </div>
        )}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec euismod odio. Curabitur orci risus,
        cursus sit amet tellus vehicula, fermentum ultrices massa.
      </Modal>
    )}
  </div>
```