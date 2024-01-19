import { ICamelCaseHelper } from "./@interfaces/helper.interfaces";

export default class CamelCaseHelper implements ICamelCaseHelper {
  async convert<T>(data: object): Promise<T> {
    return this.toCamelCase(data) as T;
  }

  private toCamelCase(data: object): object {
    if (!data || typeof data !== 'object') return data;

    if (Array.isArray(data)) {
      return data.map(item => this.toCamelCase(item));
    }

    return Object.entries(data).reduce((newObj: Record<string, any>, [key, value]) => {
      const camelCaseKey = key.replace(/[_-](\w)/g, (_, char) => char.toUpperCase());
      newObj[camelCaseKey] = this.toCamelCase(value);
      return newObj;
    }, {});
  }
}