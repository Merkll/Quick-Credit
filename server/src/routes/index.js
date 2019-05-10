import v1 from './v1';

export default (router) => {
  router.use('/api/v1', v1(router));
  return router;
};
