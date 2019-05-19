/* eslint-disable import/prefer-default-export */

const replaceTrailingTags = (string) => {
  const tagsRegularExp = new RegExp(/{{.*?}}/, 'gi'); 
  return string.replace(tagsRegularExp, '');
};

const replaceTag = (string, tag, value) => {
  const templateTag = `{{${tag}}}`;
  return string.replace(new RegExp(templateTag, 'g'), `${value}${templateTag}`); // appends original tag to handle multiple elements
};

export const replaceString = (string, data) => {
  let replacedString = string;
  Object.entries(data).map(([key, value]) => {
    replacedString = replaceTag(replacedString, key, value);
    return replacedString;
  });
  return replaceTrailingTags(replacedString);
};
