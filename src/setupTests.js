import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

//allows use tests without importing
global.shallow = shallow;
global.mount = mount;