namespace BlazorUI.Models
{
    public class Tarefa
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty; // Initialize with default value
        public string Descricao { get; set; } = string.Empty;
        public bool Concluida { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
