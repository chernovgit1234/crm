
export default class TaskData {
  public Id: string | null = null
  public Name: string | null = null
  public Author: string | null = null
  public Remark: string | null = null
  public Files: Array<string> | null = null
  public DataEnd: Date | null = null
  public DataStart: string | null = null
  public Status: string | null = null
  public Accountable: string | null = null
  public Executor: string | null = null
}
