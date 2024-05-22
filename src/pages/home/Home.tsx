import KanbanBoard from '../../assets/scrum_board.svg';

const Home = () => {
   return (
      <div className="h-full w-full grid place-content-center">
         <img src={KanbanBoard} alt="kanban board" className="w-auto h-60 lg:h-96 mx-auto transition-all" />
      </div>
   );
};

export default Home;
