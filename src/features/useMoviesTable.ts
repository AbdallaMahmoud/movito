import { ref } from '@vue/composition-api';

export default function () {
  const headers = ref([
    { text: '', value: 'star' },
    { text: 'Title', value: 'Title' },
    { text: 'Year', value: 'Year' },
    { text: 'imdbID', value: 'imdbID' },
  ]);

  const footerProps = ref({
    'items-per-page-options': [],
  });

  return {
    headers,
    footerProps,
  };
}
