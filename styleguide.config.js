const [webpackConfig] = require('./webpack/dev.config');
const path = require('path');
const { version } = require('./package.json');
const blackList = [
  '**/js/components/index.js',
  '**/js/components/Table/DefaultRows.js',
  '**/js/components/ErrorMessage/errorCodes.js',
  '**/js/components/Icon/icons.js',
];

module.exports = {
  title: `AgaveLab Docs ${version}`,
  editorConfig: { theme: 'monokai' },
  usageMode: 'expand',
  exampleMode: 'expand',
  pagePerSection: true,
  template: {
    favicon: 'http://agavelab.com/xfavicon.png.pagespeed.ic.ghIrT-K1M4.png',
  },
  sections: [
    {
      name: '',
      content: './README.md'
    },
    {
      name: 'Components',
      components: () => ([
        path.resolve(__dirname, 'src/js/components/Alert', 'Alert.js'),
        path.resolve(__dirname, 'src/js/components/Animation', 'Animation.js'),
        path.resolve(__dirname, 'src/js/components/Avatar', 'Avatar.js'),
        path.resolve(__dirname, 'src/js/components/Badge', 'Badge.js'),
        path.resolve(__dirname, 'src/js/components/Button', 'Button.js'),
        path.resolve(__dirname, 'src/js/components/Dropdown', 'Dropdown.js'),
        path.resolve(__dirname, 'src/js/components/ErrorMessage', 'ErrorMessage.js'),
        path.resolve(__dirname, 'src/js/components/Icon', 'Icon.js'),
        path.resolve(__dirname, 'src/js/components/Modal', 'Modal.js'),
        path.resolve(__dirname, 'src/js/components/Number', 'NumberFormat.js'),
        path.resolve(__dirname, 'src/js/components/Table', 'Table.js'),
        path.resolve(__dirname, 'src/js/components/TimePicker', 'TimePicker.js'),
        path.resolve(__dirname, 'src/js/components/Tooltip', 'Tooltip.js'),
        path.resolve(__dirname, 'src/js/components/Panel', 'Panel.js'),
      ])
    },
    {
      name: 'Forms',
      components: () => ([
        path.resolve(__dirname, 'src/js/components/Checkbox', 'Checkbox.js'),
        path.resolve(__dirname, 'src/js/components/DatePicker', 'DatePicker.js'),
        path.resolve(__dirname, 'src/js/components/FileSelector', 'FileSelector.js'),
        path.resolve(__dirname, 'src/js/components/RadioButton', 'RadioButton.js'),
        path.resolve(__dirname, 'src/js/components/Select', 'Select.js'),
        path.resolve(__dirname, 'src/js/components/Switch', 'Switch.js'),
        path.resolve(__dirname, 'src/js/components/TextField', 'TextField.js'),
      ])
    },
    {
      name: 'Pages',
      components: () => ([
        path.resolve(__dirname, 'src/js/components/PageSelector', 'PageSelector.js'),
        path.resolve(__dirname, 'src/js/components/PageSizeDropdown', 'PageSizeDropdown.js'),
        path.resolve(__dirname, 'src/js/components/ScrollView', 'ScrollView.js'),
        path.resolve(__dirname, 'src/js/components/Title', 'Title.js'),
        path.resolve(__dirname, 'src/js/components/Helmet', 'Helmet.js'),
        path.resolve(__dirname, 'src/js/components/EmptyState', 'EmptyState.js'),
      ])
    }
  ],
  ignore: blackList,
  webpackConfig,
  require: [path.resolve(__dirname, 'styleguide.setup.js'),],
};
