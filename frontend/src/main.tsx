import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom/client'


const LazyApp = lazy(()=> import('./App.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LazyApp />
  </React.StrictMode>,
)
