namespace MvcAPI.Models
{
    public class Tarefa
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Descricao { get; set; }
        public bool Concluida { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
