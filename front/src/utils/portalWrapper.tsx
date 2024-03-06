import ReactDOM from 'react-dom';

const portalWrapper = (inject: React.ReactNode, target: Element) => {
  console.log(inject, target);
  if (target && inject) {
    return ReactDOM.createPortal(inject, target);
  }
};

export default portalWrapper;
