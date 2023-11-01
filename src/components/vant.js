/** vant按需引入组件 */

import 'vant/es/button/style';
import 'vant/es/icon/style';
import 'vant/es/image/style';
import 'vant/es/lazyload/style';
import 'vant/es/col/style';
import 'vant/es/row/style';
import 'vant/es/popup/style';
import 'vant/es/toast/style';
import 'vant/es/calendar/style';
import 'vant/es/checkbox/style';
import 'vant/es/checkbox-group/style';
import 'vant/es/date-picker/style';
import 'vant/es/field/style';
import 'vant/es/form/style';
import 'vant/es/number-keyboard/style';
import 'vant/es/password-input/style';
import 'vant/es/picker/style';
import 'vant/es/radio/style';
import 'vant/es/radio-group/style';
import 'vant/es/search/style';
import 'vant/es/slider/style';
import 'vant/es/switch/style';
import 'vant/es/uploader/style';
import 'vant/es/action-sheet/style';
import 'vant/es/dialog/style';
import 'vant/es/dropdown-menu/style';
import 'vant/es/dropdown-item/style';
import 'vant/es/loading/style';
import 'vant/es/overlay/style';
import 'vant/es/pull-refresh/style';
import 'vant/es/share-sheet/style';
import 'vant/es/empty/style';
import 'vant/es/image-preview/style';
import 'vant/es/list/style';
import 'vant/es/sticky/style';
import 'vant/es/grid/style';
import 'vant/es/grid-item/style';
import 'vant/es/index-bar/style';
import 'vant/es/index-anchor/style';
import 'vant/es/nav-bar/style';
import 'vant/es/tab/style';
import 'vant/es/tabs/style';
import 'vant/es/tabbar/style';
import 'vant/es/tabbar-item/style';
import 'vant/es/badge/style';
import 'vant/es/popover/style';
import 'vant/es/cell/style';
import 'vant/es/cell-group/style';
import 'vant/es/divider/style';
import 'vant/es/tag/style';

import {
  Button,
  Icon,
  Image as VanImage,
  Lazyload,
  Col,
  Row,
  Popup,
  Toast,
  Calendar,
  Cascader,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Field,
  Form,
  NumberKeyboard,
  PasswordInput,
  Picker,
  Radio,
  RadioGroup,
  Search,
  Slider,
  Switch,
  Uploader,
  ActionSheet,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Loading,
  Overlay,
  PullRefresh,
  ShareSheet,
  Empty,
  ImagePreview,
  List,
  Sticky,
  Grid,
  GridItem,
  IndexBar,
  IndexAnchor,
  NavBar,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Badge,
  Popover,
  Cell,
  CellGroup,
  Divider,
  Tag
} from 'vant';

export const installVant = (app) => {
  app.use(Button);
  app.use(Icon);
  app.use(VanImage);
  app.use(Col);
  app.use(Row);
  app.use(Popup);
  app.use(Toast);
  app.use(Calendar);
  app.use(Cascader);
  app.use(Checkbox);
  app.use(CheckboxGroup);
  app.use(DatePicker);
  app.use(Field);
  app.use(Form);
  app.use(NumberKeyboard);
  app.use(PasswordInput);
  app.use(Picker);
  app.use(Radio);
  app.use(RadioGroup);
  app.use(Search);
  app.use(Slider);
  app.use(Switch);
  app.use(Uploader);
  app.use(ActionSheet);
  app.use(Dialog);
  app.use(DropdownMenu);
  app.use(DropdownItem);
  app.use(Loading);
  app.use(Overlay);
  app.use(PullRefresh);
  app.use(ShareSheet);
  app.use(Empty);
  app.use(ImagePreview);
  app.use(List);
  app.use(Sticky);
  app.use(Grid);
  app.use(GridItem);
  app.use(IndexBar);
  app.use(IndexAnchor);
  app.use(NavBar);
  app.use(Tab);
  app.use(Tabs);
  app.use(Tabbar);
  app.use(TabbarItem);
  app.use(Badge);
  app.use(Popover);
  app.use(Lazyload);
  app.use(Cell);
  app.use(CellGroup);
  app.use(Divider);
  app.use(Tag);
};
