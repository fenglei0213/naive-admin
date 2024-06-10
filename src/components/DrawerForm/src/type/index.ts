import { CSSProperties } from 'vue';

export interface DrawerContentProps {
  bodyStyle?: string | CSSProperties;
  bodyContentStyle?: string | CSSProperties;
  closable?: Boolean;
  footerStyle?: string | CSSProperties;
  headerStyle?: string | CSSProperties;
  nativeScrollbar?: Boolean;
  title: string;
}
