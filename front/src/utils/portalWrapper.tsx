import ReactDOM from 'react-dom';

const portalWrapper = (inject: React.ReactNode, target: Element) => {
  if (target && inject) {
    return ReactDOM.createPortal(inject, target);
  }
};

export default portalWrapper;
