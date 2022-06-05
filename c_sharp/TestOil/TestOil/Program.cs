 using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestOil
{
    public interface ITreeNode
    {
        int TypeObj { get; set; }
        string NameObj { get; set; }
        List<ITreeNode> Childs { get; set; }
        bool hasThisChild(int typeobj, string nameobj);
    }

    public class Oil : ITreeNode
    {
        public int TypeObj { get; set; }
        public string NameObj { get; set; }
        public List<ITreeNode> Childs { get; set; }
        public bool hasThisChild(int typeobj, string nameobj)
        {
            return (Childs.Exists(x => x.TypeObj == typeobj && x.NameObj == nameobj) ? true : false);            
        }

        public Oil(int typeobj, string nameobj, List<ITreeNode> child)
        {
            TypeObj = typeobj;
            NameObj = nameobj;
            Childs = child;
        }
    }
    internal class Program
    {      
        
        static void Main(string[] args)
        {
            
        }   
    }
}
