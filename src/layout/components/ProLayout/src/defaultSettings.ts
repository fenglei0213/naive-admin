import projectSetting from '@/settings/projectSetting';

export interface PureSettings {
  title: string;
  navMode: string;
  navTheme: string;
  contentWidth: string;
  fixedHeader: boolean;
  navWidth: number;
  navMinWidth: number;
  subNavWidth: number;
  headerHeight: number;
  navTrigger: string;
}

export const defaultSettings = {
  title: 'Naive Admin',
  primaryColor: '#1890ff',
  contentWidth: 'full',
  navMode: projectSetting.navMode,
  navTheme: projectSetting.navTheme,
  navTrigger: projectSetting.navTrigger,
  fixedHeader: projectSetting.fixedHeader,
  navWidth: projectSetting.navWidth,
  navMinWidth: projectSetting.navMinWidth,
  subNavWidth: projectSetting.subNavWidth,
  headerHeight: projectSetting.headerHeight,
};
