import { Router } from 'express';
import healthRoutes from './modules/common/health.route';
import busRoutes from './modules/bus/bus.routes';
import routeRoutes from './modules/route/route.routes';
import busRouteRoutes from './modules/busRoutes/busRoute.routes';
import tripRoutes from './modules/trip/trip.routes';
import tripStopRoutes from './modules/tripStop/tripStop.routes';
import routeStopRoutes from './modules/routeStop/routeStop.routes';
import seatTemplateRoutes from './modules/seatTemplate/seatTemplate.route';
import seatRoutes from './modules/seat/seat.route';
import searchRoute from './modules/tripSearch/tripSearch.route';

const router = Router();

// Common & internal routes
router.use('/', healthRoutes);

// Business modules
router.use('/buses', busRoutes);
router.use('/routes', routeRoutes);
router.use('/bus-routes', busRouteRoutes);
router.use('/trip-routes', tripRoutes);
router.use('/trip-stop', tripStopRoutes);
router.use('/route-stop', routeStopRoutes);
router.use('/seat-template', seatTemplateRoutes);
router.use('/seat', seatRoutes);
router.use('/search', searchRoute);

export default router;
