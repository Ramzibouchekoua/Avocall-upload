/*
 * Navbar Messages
 *
 * This contains all the text for the Navbar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Navbar';

export default defineMessages({
  nav_link_1: {
    id: `${scope}.nav_link_1`,
    defaultMessage: 'الرئيسية',
  },
  nav_link_2: {
    id: `${scope}.nav_link_2`,
    defaultMessage: 'إتّصل بمحامٍ',
  },
  nav_link_3: {
    id: `${scope}.nav_link_3`,
    defaultMessage: 'أنا محامي',
  },
  nav_link_4: {
    id: `${scope}.nav_link_4`,
    defaultMessage: 'كيف نعمل؟',
  },
  nav_link_5: {
    id: `${scope}.nav_link_5`,
    defaultMessage: 'مجالات الإختصاص',
  },
  nav_link_6: {
    id: `${scope}.nav_link_6`,
    defaultMessage: 'أسعارنا',
  },
  nav_link_7: {
    id: `${scope}.nav_link_7`,
    defaultMessage: 'جدول المواعيد',
  },
  nav_link_8: {
    id: `${scope}.nav_link_8`,
    defaultMessage: 'توقيت العمل',
  },
});
