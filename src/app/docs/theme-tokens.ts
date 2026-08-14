export interface TokenDefinition {
  name: string;
  description: string;
}

export const SEMANTIC_TOKENS: TokenDefinition[] = [
  {
    name: '--el-color-accent',
    description: 'Primary brand color used by primary buttons and accents.',
  },
  {
    name: '--el-color-accent-hover',
    description: 'Hover state for accent-colored surfaces.',
  },
  {
    name: '--el-color-accent-subtle',
    description: 'Subtle accent background (ghost button hover, highlights).',
  },
  {
    name: '--el-color-fg',
    description: 'Default foreground text color.',
  },
  {
    name: '--el-color-fg-muted',
    description: 'Muted foreground for secondary text.',
  },
  {
    name: '--el-color-fg-inverse',
    description: 'Text on accent or dark backgrounds.',
  },
  {
    name: '--el-color-error',
    description: 'Error and destructive emphasis color.',
  },
  {
    name: '--el-color-border',
    description: 'Default border and secondary fill color.',
  },
  {
    name: '--el-color-border-muted',
    description: 'Border hover and secondary fill hover.',
  },
  {
    name: '--el-font-sans',
    description:
      'UI font stack. Geist Variable is bundled with theme; falls back to system-ui.',
  },
  {
    name: '--el-font-mono',
    description:
      'Monospace font stack. Geist Mono Variable is bundled; falls back to system monospace.',
  },
];

export const ICON_TOKENS: TokenDefinition[] = [
  {
    name: '--el-icon-size-sm',
    description: 'Small icon size used in compact controls.',
  },
  {
    name: '--el-icon-size-md',
    description: 'Default icon size.',
  },
  {
    name: '--el-icon-size-lg',
    description: 'Large icon size for emphasis.',
  },
];

export const BUTTON_TOKENS: TokenDefinition[] = [
  {
    name: '--el-button-primary-bg',
    description: 'Primary button background. Defaults to --el-color-accent.',
  },
  {
    name: '--el-button-primary-bg-hover',
    description: 'Primary button hover background.',
  },
  {
    name: '--el-button-primary-fg',
    description: 'Primary button label color.',
  },
  {
    name: '--el-button-secondary-bg',
    description: 'Secondary button background.',
  },
  {
    name: '--el-button-secondary-bg-hover',
    description: 'Secondary button hover background.',
  },
  {
    name: '--el-button-secondary-fg',
    description: 'Secondary button label color.',
  },
  {
    name: '--el-button-ghost-fg',
    description: 'Ghost button label color.',
  },
  {
    name: '--el-button-ghost-bg-hover',
    description: 'Ghost button hover background.',
  },
];

export const LABEL_TOKENS: TokenDefinition[] = [
  {
    name: '--el-label-fg',
    description: 'Default label text color.',
  },
  {
    name: '--el-label-fg-muted',
    description: 'Muted variant label color.',
  },
  {
    name: '--el-label-fg-error',
    description: 'Error variant label color.',
  },
  {
    name: '--el-label-required',
    description: 'Required asterisk color.',
  },
];

export const FORM_ERROR_TOKENS: TokenDefinition[] = [
  {
    name: '--el-form-error-fg',
    description: 'Form error message text color.',
  },
];

export const INPUT_TOKENS: TokenDefinition[] = [
  {
    name: '--el-input-bg',
    description: 'Input field background.',
  },
  {
    name: '--el-input-border',
    description: 'Default field border color.',
  },
  {
    name: '--el-input-border-hover',
    description: 'Border color on hover and focus.',
  },
  {
    name: '--el-input-border-error',
    description: 'Border color in the error state.',
  },
  {
    name: '--el-input-placeholder-fg',
    description: 'Placeholder text color.',
  },
  {
    name: '--el-input-affix-fg',
    description: 'Prefix and suffix text or icon color.',
  },
  {
    name: '--el-input-focus-ring',
    description: 'Focus ring color around the field.',
  },
];

export const CHECKBOX_TOKENS: TokenDefinition[] = [
  {
    name: '--el-checkbox-size',
    description: 'Checkbox control width and height.',
  },
  {
    name: '--el-checkbox-gap',
    description: 'Space between the control and label text.',
  },
  {
    name: '--el-checkbox-label-fg',
    description: 'Label text color.',
  },
  {
    name: '--el-checkbox-border',
    description: 'Unchecked border color.',
  },
  {
    name: '--el-checkbox-selected-bg',
    description: 'Checked and indeterminate fill color.',
  },
  {
    name: '--el-checkbox-mark',
    description: 'Checkmark and indeterminate bar color.',
  },
  {
    name: '--el-checkbox-error-border',
    description: 'Error state border and fill color.',
  },
  {
    name: '--el-checkbox-focus-ring',
    description: 'Focus ring color around the control.',
  },
];

export const SLIDE_TOGGLE_TOKENS: TokenDefinition[] = [
  {
    name: '--el-slide-toggle-track-on-bg',
    description: 'Track fill when the switch is on.',
  },
  {
    name: '--el-slide-toggle-track-on-border',
    description: 'Track border when the switch is on.',
  },
  {
    name: '--el-slide-toggle-thumb-on-bg',
    description: 'Thumb fill when the switch is on.',
  },
  {
    name: '--el-slide-toggle-icon-on-fg',
    description: 'Track on-icon color against the filled track.',
  },
  {
    name: '--el-slide-toggle-track-off-bg',
    description: 'Track fill when the switch is off.',
  },
  {
    name: '--el-slide-toggle-track-off-border',
    description: 'Track border when the switch is off.',
  },
  {
    name: '--el-slide-toggle-thumb-off-bg',
    description: 'Thumb fill when the switch is off.',
  },
  {
    name: '--el-slide-toggle-icon-off-fg',
    description: 'Track off-icon color against the outlined track.',
  },
  {
    name: '--el-slide-toggle-thumb-icon-on-fg',
    description: 'Thumb on-icon color against the on thumb.',
  },
  {
    name: '--el-slide-toggle-thumb-icon-off-fg',
    description: 'Thumb off-icon color against the off thumb.',
  },
  {
    name: '--el-slide-toggle-focus-ring',
    description: 'Focus ring color around the track.',
  },
];

export const RADIO_TOKENS: TokenDefinition[] = [
  {
    name: '--el-radio-size',
    description: 'Radio control width and height.',
  },
  {
    name: '--el-radio-gap',
    description: 'Space between the control and label text.',
  },
  {
    name: '--el-radio-label-fg',
    description: 'Label text color.',
  },
  {
    name: '--el-radio-border',
    description: 'Unchecked border color.',
  },
  {
    name: '--el-radio-selected-border',
    description: 'Checked outer ring color.',
  },
  {
    name: '--el-radio-dot',
    description: 'Inner dot color when selected.',
  },
  {
    name: '--el-radio-focus-ring',
    description: 'Focus ring color around the control.',
  },
  {
    name: '--el-radio-group-gap-vertical',
    description: 'Spacing between radios in a vertical group.',
  },
  {
    name: '--el-radio-group-gap-horizontal',
    description: 'Spacing between radios in a horizontal group.',
  },
];

export const SEGMENTED_BUTTON_TOKENS: TokenDefinition[] = [
  {
    name: '--el-segmented-track-bg-primary',
    description: 'Primary variant track background.',
  },
  {
    name: '--el-segmented-track-border-ghost',
    description: 'Ghost variant outer border color.',
  },
  {
    name: '--el-segmented-item-border-ghost',
    description: 'Ghost variant divider between items.',
  },
  {
    name: '--el-segmented-item-hover-bg-ghost',
    description: 'Ghost variant item hover background.',
  },
  {
    name: '--el-segmented-md3-outline',
    description: 'Secondary variant border and divider color.',
  },
  {
    name: '--el-segmented-md3-on-surface',
    description: 'Secondary variant default item text.',
  },
  {
    name: '--el-segmented-md3-secondary-container',
    description: 'Secondary variant selected item background.',
  },
  {
    name: '--el-segmented-md3-on-secondary-container',
    description: 'Secondary variant selected item text.',
  },
  {
    name: '--el-segmented-md3-focus',
    description: 'Focus ring color for secondary variant.',
  },
  {
    name: '--el-color-overlay-hover',
    description: 'Primary variant item hover overlay.',
  },
  {
    name: '--el-color-overlay-hover-muted',
    description: 'Secondary variant item hover overlay.',
  },
  {
    name: '--el-color-fg-disabled',
    description: 'Disabled item text color.',
  },
];

export const SELECT_TOKENS: TokenDefinition[] = [
  {
    name: '--el-select-trigger-bg',
    description: 'Closed select trigger background.',
  },
  {
    name: '--el-select-trigger-border',
    description: 'Trigger border color.',
  },
  {
    name: '--el-select-placeholder-fg',
    description: 'Placeholder text color when nothing is selected.',
  },
  {
    name: '--el-select-panel-bg',
    description: 'Dropdown panel background.',
  },
  {
    name: '--el-select-panel-shadow',
    description: 'Dropdown panel shadow.',
  },
  {
    name: '--el-select-item-hover-bg',
    description: 'Hovered or keyboard-active option background.',
  },
  {
    name: '--el-select-item-selected-bg',
    description: 'Selected option background in single-select mode.',
  },
  {
    name: '--el-select-toolbar-fg',
    description: 'Select all / Unselect all action color.',
  },
  {
    name: '--el-select-focus-ring',
    description: 'Focus ring color for the trigger and options.',
  },
];

export const DATEPICKER_TOKENS: TokenDefinition[] = [
  {
    name: '--el-datepicker-trigger-border',
    description: 'Trigger border color.',
  },
  {
    name: '--el-datepicker-placeholder-fg',
    description: 'Placeholder text color when nothing is selected.',
  },
  {
    name: '--el-datepicker-panel-bg',
    description: 'Dropdown panel background.',
  },
  {
    name: '--el-datepicker-panel-shadow',
    description: 'Dropdown panel shadow.',
  },
  {
    name: '--el-datepicker-day-selected-bg',
    description: 'Selected day and clock tick background.',
  },
  {
    name: '--el-datepicker-range-bg',
    description: 'In-between days in a selected or hovered range.',
  },
  {
    name: '--el-datepicker-clock-face-bg',
    description: 'Analog clock face background.',
  },
  {
    name: '--el-datepicker-clock-hand',
    description: 'Clock hand and center cap color.',
  },
  {
    name: '--el-datepicker-focus-ring',
    description: 'Focus ring color for the trigger, days, and clock.',
  },
];

export const CHIP_TOKENS: TokenDefinition[] = [
  {
    name: '--el-chip-height',
    description: 'Chip minimum height.',
  },
  {
    name: '--el-chip-radius',
    description: 'Corner radius for all chip surfaces.',
  },
  {
    name: '--el-chip-border',
    description: 'Outlined chip border color.',
  },
  {
    name: '--el-chip-fg-outlined',
    description: 'Label color on outlined and elevated chips.',
  },
  {
    name: '--el-chip-fg-assist',
    description: 'Label color on assist chips.',
  },
  {
    name: '--el-chip-fg-filled',
    description: 'Label color on filled and selected filter chips.',
  },
  {
    name: '--el-chip-bg-filled',
    description: 'Background for filled, input, and selected filter chips.',
  },
  {
    name: '--el-chip-bg-elevated',
    description: 'Background for elevated suggestion chips.',
  },
  {
    name: '--el-chip-elevated-shadow',
    description: 'Shadow stack for elevated suggestion chips.',
  },
  {
    name: '--el-chip-focus-ring',
    description: 'Focus ring color around interactive chips.',
  },
];

export const PROGRESS_TOKENS: TokenDefinition[] = [
  {
    name: '--el-progress-track-bg',
    description: 'Background of the unfilled track (line and circle).',
  },
  {
    name: '--el-progress-fill-bg',
    description: 'Fill / stroke color for completed progress.',
  },
  {
    name: '--el-progress-label-fg',
    description: 'Percent label text color.',
  },
  {
    name: '--el-progress-track-radius',
    description: 'Corner radius of the line track.',
  },
  {
    name: '--el-progress-track-height-sm',
    description: 'Line track height at size sm.',
  },
  {
    name: '--el-progress-track-height-md',
    description: 'Line track height at size md.',
  },
  {
    name: '--el-progress-track-height-lg',
    description: 'Line track height at size lg.',
  },
  {
    name: '--el-progress-circle-size-md',
    description: 'Circle diameter at size md (also sm/lg variants).',
  },
  {
    name: '--el-progress-circle-stroke-md',
    description: 'Circle stroke width at size md (also sm/lg variants).',
  },
];

export const SLIDER_TOKENS: TokenDefinition[] = [
  {
    name: '--el-slider-track-bg',
    description: 'Background of the unfilled rail.',
  },
  {
    name: '--el-slider-fill-bg',
    description: 'Filled portion of the rail.',
  },
  {
    name: '--el-slider-fill-error-bg',
    description: 'Filled portion when `error` is set.',
  },
  {
    name: '--el-slider-thumb-bg',
    description: 'Thumb fill color.',
  },
  {
    name: '--el-slider-thumb-border',
    description: 'Thumb border color.',
  },
  {
    name: '--el-slider-tick-bg',
    description: 'Tick mark color along the rail.',
  },
  {
    name: '--el-slider-value-bg',
    description: 'Background of the value label above the thumb.',
  },
  {
    name: '--el-slider-value-fg',
    description: 'Text color of the value label.',
  },
  {
    name: '--el-slider-focus-ring',
    description: 'Focus-visible outline on thumbs.',
  },
  {
    name: '--el-slider-track-height-md',
    description: 'Track height at size md (also sm/lg variants).',
  },
  {
    name: '--el-slider-thumb-size-md',
    description: 'Thumb diameter at size md (also sm/lg variants).',
  },
];

export const AVATAR_TOKENS: TokenDefinition[] = [
  {
    name: '--el-avatar-bg',
    description: 'Background for initials and icon fallbacks.',
  },
  {
    name: '--el-avatar-fg',
    description: 'Text and icon color for non-image content.',
  },
  {
    name: '--el-avatar-border',
    description: 'Outline color for initials and icon fallbacks.',
  },
  {
    name: '--el-avatar-border-width',
    description: 'Outline thickness for initials and icon fallbacks.',
  },
  {
    name: '--el-avatar-size-sm',
    description: 'Diameter at size sm.',
  },
  {
    name: '--el-avatar-size-md',
    description: 'Diameter at size md.',
  },
  {
    name: '--el-avatar-size-lg',
    description: 'Diameter at size lg.',
  },
  {
    name: '--el-avatar-font-size-md',
    description: 'Initials font size at size md (also sm/lg variants).',
  },
];

export const CARD_TOKENS: TokenDefinition[] = [
  {
    name: '--el-card-bg',
    description: 'Card surface background.',
  },
  {
    name: '--el-card-fg',
    description: 'Primary text color on the card.',
  },
  {
    name: '--el-card-fg-muted',
    description: 'Muted body text color.',
  },
  {
    name: '--el-card-border',
    description: 'Border color for outlined appearance.',
  },
  {
    name: '--el-card-radius',
    description: 'Corner radius of the card shell.',
  },
  {
    name: '--el-card-padding',
    description: 'Padding for header, content, and footer regions.',
  },
  {
    name: '--el-card-gap',
    description: 'Gap inside header and footer flex layouts.',
  },
  {
    name: '--el-card-elevated-shadow',
    description: 'Box shadow for elevated appearance.',
  },
  {
    name: '--el-card-compact-padding',
    description: 'Outer padding for compact (horizontal) cards.',
  },
  {
    name: '--el-card-compact-gap',
    description: 'Gap between media, body, and footer in compact cards.',
  },
  {
    name: '--el-card-compact-media-size',
    description: 'Leading media slot size in compact cards.',
  },
];

export const ATTACHMENT_TOKENS: TokenDefinition[] = [
  {
    name: '--el-attachment-bg',
    description: 'Attachment surface background.',
  },
  {
    name: '--el-attachment-fg',
    description: 'Primary text color.',
  },
  {
    name: '--el-attachment-fg-muted',
    description: 'Description text color.',
  },
  {
    name: '--el-attachment-border',
    description: 'Default border color.',
  },
  {
    name: '--el-attachment-radius',
    description: 'Corner radius of the attachment card.',
  },
  {
    name: '--el-attachment-media-size-md',
    description: 'Media box size at md (also sm/lg variants).',
  },
  {
    name: '--el-attachment-error-bg',
    description: 'Surface background in error state.',
  },
  {
    name: '--el-attachment-shimmer',
    description: 'Highlight color for uploading/processing title shimmer.',
  },
  {
    name: '--el-attachment-group-gap',
    description: 'Gap between attachments in a group scroller.',
  },
  {
    name: '--el-attachment-group-item-width',
    description: 'Fixed card width for each item in AttachmentGroup.',
  },
  {
    name: '--el-attachment-vertical-media-height',
    description: 'Image media height when orientation is vertical.',
  },
];

export const FILE_UPLOAD_TOKENS: TokenDefinition[] = [
  {
    name: '--el-file-upload-bg',
    description: 'Dropzone surface background.',
  },
  {
    name: '--el-file-upload-border',
    description: 'Default dashed border color.',
  },
  {
    name: '--el-file-upload-border-active',
    description: 'Border while dragging accepted files.',
  },
  {
    name: '--el-file-upload-border-reject',
    description: 'Border while dragging rejected files.',
  },
  {
    name: '--el-file-upload-bg-active',
    description: 'Background while dragging accepted files.',
  },
  {
    name: '--el-file-upload-radius',
    description: 'Dropzone corner radius.',
  },
  {
    name: '--el-file-upload-padding-md',
    description: 'Dropzone padding at md (also sm/lg variants).',
  },
  {
    name: '--el-file-upload-list-gap',
    description: 'Gap between auto-rendered attachment rows.',
  },
];
