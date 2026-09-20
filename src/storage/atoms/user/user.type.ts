export interface AtomUserI {
  home: string[] | undefined;
  admin: boolean;
  managed?: string;
  status: 'unlogged' | 'logged';
}
