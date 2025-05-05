using Microsoft.AspNetCore.Mvc;
using MvcAPI.Models;

namespace MvcAPI.Controllers
{
    [Route("api/tarefas")]
    [ApiController]
    public class TarefasController : ControllerBase
    {
        private static List<Tarefa> tarefas = new List<Tarefa>
        {
            new Tarefa { Id = 1, Text = "Birthday", Start = DateTime.Today.AddDays(-2), End = DateTime.Today.AddDays(-2), Concluida = false, Descricao = "Celebrate with family and friends." },
            new Tarefa { Id = 2, Text = "Day off", Start = DateTime.Today.AddDays(-11), End = DateTime.Today.AddDays(-10), Concluida = true, Descricao = "Relax and recharge." },
            new Tarefa { Id = 3, Text = "Work from home", Start = DateTime.Today.AddDays(-10), End = DateTime.Today.AddDays(-8), Concluida = false },
            new Tarefa { Id = 4, Text = "Online meeting", Start = DateTime.Today.AddHours(10), End = DateTime.Today.AddHours(12), Concluida = false, Descricao = "Discuss project updates." },
            new Tarefa { Id = 5, Text = "Skype call", Start = DateTime.Today.AddHours(10), End = DateTime.Today.AddHours(13), Concluida = true },
            new Tarefa { Id = 6, Text = "Dentist appointment", Start = DateTime.Today.AddHours(14), End = DateTime.Today.AddHours(14).AddMinutes(30), Concluida = false, Descricao = "Routine dental check-up." },
            new Tarefa { Id = 7, Text = "Vacation", Start = DateTime.Today.AddDays(1), End = DateTime.Today.AddDays(12), Concluida = false, Descricao = "Relax and enjoy the beach." }
        };
        private static int _NextId = tarefas.Count;

        [HttpGet]
        public IActionResult GetTarefas() => Ok(tarefas);

        [HttpPost]
        public IActionResult AdicionarTarefa([FromBody] Tarefa tarefa)
        {
            tarefa.Id = _NextId++;
            tarefas.Add(tarefa);
            return CreatedAtAction(nameof(GetTarefas), new { id = tarefa.Id }, tarefa);
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarTarefa(int id, [FromBody] Tarefa tarefaAtualizada)
        {
            var tarefa = tarefas.FirstOrDefault(t => t.Id == id);
            if (tarefa == null) return NotFound();
            
            tarefa.Text = tarefaAtualizada.Text;
            tarefa.Start = tarefaAtualizada.Start;
            tarefa.End = tarefaAtualizada.End;
            tarefa.Concluida = tarefaAtualizada.Concluida;
            tarefa.Descricao = tarefaAtualizada.Descricao;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult RemoverTarefa(int id)
        {
            var tarefa = tarefas.FirstOrDefault(t => t.Id == id);
            if (tarefa == null) return NotFound();

            tarefas.Remove(tarefa);
            return NoContent();
        }
    }
}
