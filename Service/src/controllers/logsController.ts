import AppRoute from 'types/appRoute';
import Log from 'models/logModel';

const r = new AppRoute(); export default r;
r.DeleteMethod(async () => Log.deleteMany());
