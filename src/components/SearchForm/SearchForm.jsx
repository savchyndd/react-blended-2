import { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export const SearchForm = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!value.trim()) {
      setValue('');
      alert('Write some thing search!');

      return;
    }

    onSubmit(value);
    setValue('');
  };

  return (
    <SearchFormStyled onSubmit={handleSubmit}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
        value={value}
        onChange={handleChange}
      />
    </SearchFormStyled>
  );
};

// export class SearchForm extends Component {
//   state = {
//     value: ''
//   }

//   handleChange = (e) => {
//     this.setState({
//       value: e.target.value,
//     });
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();

//     if (!this.state.value.trim()) {
//       alert('Введіть щось будь ласка :)');
//       return;
//     }

//     this.props.onSubmit(this.state.value);
//     this.setState({ value:  '' });
//   }

//   render() {
// return (
//   <SearchFormStyled onSubmit={this.handleSubmit}>
//     <FormBtn type="submit">
//       <FiSearch size="16px" />
//     </FormBtn>
//     <InputSearch
//       placeholder="What do you want to write?"
//       name="search"
//       required
//       autoFocus
//       value={this.state.value}
//       onChange={this.handleChange}
//     />
//   </SearchFormStyled>
// );
//   }
// }
