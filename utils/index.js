// Utility function for creating page URLs
export const createPageUrl = (pageName) => {
  return `/${pageName.toLowerCase().replace(/ /g, '-')}`;
};

// Class name utility
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
