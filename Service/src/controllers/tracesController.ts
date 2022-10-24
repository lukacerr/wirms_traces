import AppRoute from 'types/appRoute';
import Trace from 'models/traceModel';
import { splitAndTrim } from 'utils/stringManipulation';

const r = new AppRoute(); export default r;
r.GetMethod(async (req) => Trace.find(req.body, splitAndTrim(req.get('Select')), req.query));
r.PostMethod(async (req) => Trace.find(req.body, splitAndTrim(req.get('Select')), req.query), { path: 'q' });
r.GetMethod(async (req) => Trace.findById(req.params.id), { path: ':id' });
r.PostMethod(async (req) => Trace.create({ address: req.socket.remoteAddress, ...req.body }));
r.DeleteMethod(async () => Trace.deleteMany());
r.DeleteMethod(async (req) => Trace.findByIdAndDelete(req.params.id), { path: ':id' });
r.PutMethod(async (req) => Trace.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true }), { path: ':id' });
