import { Router } from 'express';
import healthRoutes from './modules/common/health.route';
import busRoutes from './modules/bus/bus.routes';
import routeRoutes from './modules/route/route.routes';
import busRouteRoutes from './modules/busRoutes/busRoute.routes';

const router = Router();

// Common & internal routes
router.use('/', healthRoutes);

// Business modules
router.use('/buses', busRoutes);
router.use('/routes', routeRoutes);
router.use('/bus-routes', busRouteRoutes);

export default router;
