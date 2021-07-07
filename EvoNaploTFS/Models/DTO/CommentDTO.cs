namespace EvoNaploTFS.Models.DTO
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public int OwnerId { get; set; }
        public int CommenterId { get; set; }

        public CommentDTO(int id, string comment, int ownerId, int commenterId)
        {
            Id = id;
            Comment = comment;
            OwnerId = ownerId;
            CommenterId = commenterId;
        }
    }
}
