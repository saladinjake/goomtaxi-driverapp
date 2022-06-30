import PwaCaching from './features/PwaCaching';
import PwaBackgroundSync from './features/PwaBackgroundSync';
import PwaGeolocation from './features/PwaGeolocation';
import PwaMobileDevices from './features/PwaMobileDevices';
import PwaSubscription from './features/PwaSubscription';

const Coreclasses = {
  PwaSubscription: new PwaSubscription(),
  PwaCaching: new PwaCaching(),
  BackgroundSync: new PwaBackgroundSync(),
  Geolocation: new PwaGeolocation(),
  MobileCamera: new PwaMobileDevices(),
};
export default Coreclasses;
