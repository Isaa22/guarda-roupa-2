document.addEventListener('DOMContentLoaded', function() {
    // Elementos da interface
    const homeBtn = document.getElementById('home-btn');
    const looksBtn = document.getElementById('looks-btn');
    const searchBtn = document.getElementById('search-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const createLookBtn = document.getElementById('create-look-btn');
    const createLookModal = document.getElementById('create-look-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const searchClothingBtn = document.getElementById('search-clothing-btn');
    const clothingResults = document.getElementById('clothing-results');
    const addToWardrobeModal = document.getElementById('add-to-wardrobe-modal');
    const confirmAddItemBtn = document.getElementById('confirm-add-item');
    const saveLookBtn = document.getElementById('save-look-btn');
    
    // Dados de exemplo
    let wardrobeItems = JSON.parse(localStorage.getItem('wardrobeItems')) || [];
    let savedLooks = JSON.parse(localStorage.getItem('savedLooks')) || [];
    let selectedItemForWardrobe = null;
    
    // Navegação entre seções
    homeBtn.addEventListener('click', () => toggleSection('wardrobe-section'));
    looksBtn.addEventListener('click', () => {
        toggleSection('looks-section');
        loadRecommendedLooks();
    });
    searchBtn.addEventListener('click', () => toggleSection('search-section'));
    
    function toggleSection(sectionId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        
        // Atualizar botão ativo na navegação
        document.querySelectorAll('.nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        if (sectionId === 'wardrobe-section') homeBtn.classList.add('active');
        if (sectionId === 'looks-section') looksBtn.classList.add('active');
        if (sectionId === 'search-section') searchBtn.classList.add('active');
    }
    
    // Modal de criar look
    createLookBtn.addEventListener('click', () => {
        createLookModal.style.display = 'block';
    });
    
    // Fechar modais
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Pesquisar roupas (simulação)
    searchClothingBtn.addEventListener('click', searchClothing);
    
    function searchClothing() {
        const searchTerm = document.getElementById('clothing-search').value.toLowerCase();
        const category = document.getElementById('category-filter').value;
        const color = document.getElementById('color-filter').value;
        const activeStore = document.querySelector('.store-tab.active').dataset.store;
        
        // Limpar resultados anteriores
        clothingResults.innerHTML = '';
        
        // Simulação de dados de lojas
        let storeItems = [];
        
        if (activeStore === 'shein') {
            storeItems = [
                { id: 1, name: 'Cropped Preto Básico', store: 'Shein', price: 'R$ 49,90', category: 'tops', color: 'black', image: 'https://via.placeholder.com/200x300/333333/FFFFFF?text=Cropped+Preto' },
                { id: 2, name: 'Calça Jeans Skinny', store: 'Shein', price: 'R$ 89,90', category: 'bottoms', color: 'blue', image: 'https://via.placeholder.com/200x300/333333/FFFFFF?text=Jeans+Skinny' },
                { id: 3, name: 'Tênis Branco Casual', store: 'Shein', price: 'R$ 129,90', category: 'shoes', color: 'white', image: 'https://via.placeholder.com/200x300/333333/FFFFFF?text=Tênis+Branco' },
                { id: 4, name: 'Vestido Floral Midi', store: 'Shein', price: 'R$ 79,90', category: 'dresses', color: 'multicolor', image: 'https://via.placeholder.com/200x300/333333/FFFFFF?text=Vestido+Floral' },
                { id: 5, name: 'Blazer Slim Fit', store: 'Shein', price: 'R$ 119,90', category: 'tops', color: 'black', image: 'https://via.placeholder.com/200x300/333333/FFFFFF?text=Blazer+Preto' }
            ];
        } else if (activeStore === 'zara') {
            storeItems = [
                { id: 6, name: 'Camiseta Básica Branca', store: 'Zara', price: 'R$ 59,90', category: 'tops', color: 'white', image: 'https://via.placeholder.com/200x300/333333/FFFFFF?text=Camiseta+Branca' },
                { id: 7, name: 'Saia Midi Plissada', store: 'Zara', price: 'R$ 149,90', category: 'bottoms', color: 'black', image: 'https://via.placeholder.com/200x300/333333/FFFFFF?text=Saia+Plissada' },
                { id: 8, name: 'Sapatilha Couro', store: 'Zara', price: 'R$ 199,90', category: 'shoes', color: 'black', image: 'https://via.placeholder.com/200x300/333333/FFFFFF?text=Sapatilha+Couro' }
            ];
        } else if (activeStore === 'hm') {
            storeItems = [
                { id: 9, name: 'Blusa de Tricô', store: 'H&M', price: 'R$ 89,90', category: 'tops', color: 'pink', image: 'https://via.placeholder.com/200x300/333333/FFFFFF?text=Blusa+Tricô' },
                { id: 10, name: 'Calça Wide Leg', store: 'H&M', price: 'R$ 129,90', category: 'bottoms', color: 'gray', image: 'https://via.placeholder.com/200x300/333333/FFFFFF?text=Calça+Wide+Leg' },
                { id: 11, name: 'Tênis Esportivo', store: 'H&M', price: 'R$ 159,90', category: 'shoes', color: 'white', image: 'https://via.placeholder.com/200x300/333333/FFFFFF?text=Tênis+Esportivo' }
            ];
        }
        
        // Filtrar itens
        let filteredItems = storeItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) || searchTerm === '';
            const matchesCategory = category === '' || item.category === category;
            const matchesColor = color === '' || item.color === color;
            
            return matchesSearch && matchesCategory && matchesColor;
        });
        
        // Exibir resultados
        if (filteredItems.length === 0) {
            clothingResults.innerHTML = '<p>Nenhum item encontrado. Tente alterar os filtros.</p>';
            return;
        }
        
        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'clothing-item';
            itemElement.innerHTML = `
                <div class="clothing-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="clothing-details">
                    <h3>${item.name}</h3>
                    <p>${item.store}</p>
                    <p class="clothing-price">${item.price}</p>
                    <button class="add-to-wardrobe" data-id="${item.id}">Adicionar ao Guarda-Roupa</button>
                </div>
            `;
            
            clothingResults.appendChild(itemElement);
        });
        
        // Adicionar event listeners aos botões
        document.querySelectorAll('.add-to-wardrobe').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.dataset.id);
                selectedItemForWardrobe = storeItems.find(item => item.id === itemId);
                openAddToWardrobeModal(selectedItemForWardrobe);
            });
        });
    }
    
    // Abrir modal para adicionar ao guarda-roupa
    function openAddToWardrobeModal(item) {
        document.getElementById('modal-item-img').src = item.image;
        document.getElementById('modal-item-name').textContent = item.name;
        document.getElementById('modal-item-store').textContent = item.store;
        document.getElementById('modal-item-price').textContent = item.price;
        
        // Definir categoria padrão baseada no tipo de item
        if (item.category === 'dresses') {
            document.getElementById('item-category').value = 'tops'; // Vestido pode ser considerado como top
        } else {
            document.getElementById('item-category').value = item.category;
        }
        
        addToWardrobeModal.style.display = 'block';
    }
    
    // Confirmar adição ao guarda-roupa
    confirmAddItemBtn.addEventListener('click', function() {
        if (!selectedItemForWardrobe) return;
        
        const category = document.getElementById('item-category').value;
        const color = document.getElementById('item-color').value;
        const occasionSelect = document.getElementById('item-occasion');
        const occasions = Array.from(occasionSelect.selectedOptions).map(option => option.value);
        
        const newItem = {
            id: Date.now(), // ID único
            name: selectedItemForWardrobe.name,
            store: selectedItemForWardrobe.store,
            price: selectedItemForWardrobe.price,
            image: selectedItemForWardrobe.image,
            category: category,
            color: color,
            occasions: occasions,
            addedDate: new Date().toISOString()
        };
        
        wardrobeItems.push(newItem);
        localStorage.setItem('wardrobeItems', JSON.stringify(wardrobeItems));
        
        alert('Item adicionado ao seu guarda-roupa com sucesso!');
        addToWardrobeModal.style.display = 'none';
        loadWardrobeItems();
    });
    
    // Carregar itens do guarda-roupa
    function loadWardrobeItems() {
        const categories = {
            tops: document.querySelector('#tops .items-container'),
            bottoms: document.querySelector('#bottoms .items-container'),
            shoes: document.querySelector('#shoes .items-container'),
            accessories: document.querySelector('#accessories .items-container')
        };
        
        // Limpar containers
        Object.values(categories).forEach(container => {
            container.innerHTML = '';
        });
        
        if (wardrobeItems.length === 0) {
            categories.tops.innerHTML = '<p>Seu guarda-roupa está vazio. Adicione itens pesquisando na aba "Pesquisar Roupas".</p>';
            return;
        }
        
        wardrobeItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'wardrobe-item';
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${item.store} • ${item.price}</p>
                    <div class="item-tags">
                        ${item.occasions.map(occ => `<span class="tag">${occ}</span>`).join('')}
                    </div>
                </div>
            `;
            
            if (categories[item.category]) {
                categories[item.category].appendChild(itemElement);
            }
        });
    }
    
    // Carregar looks recomendados
    function loadRecommendedLooks() {
        const looksGrid = document.getElementById('recommended-looks');
        looksGrid.innerHTML = '';
        
        // Se o usuário tiver looks salvos, mostre-os
        if (savedLooks.length > 0) {
            savedLooks.forEach(look => {
                const lookElement = document.createElement('div');
                lookElement.className = 'look-card';
                lookElement.innerHTML = `
                    <div class="look-image">
                        <img src="https://via.placeholder.com/280x200/333333/FFFFFF?text=Look+${look.name.replace(/ /g, '+')}" alt="${look.name}">
                    </div>
                    <div class="look-details">
                        <h3>${look.name}</h3>
                        <p>${look.occasion} • ${look.season}</p>
                        <div class="look-tags">
                            <span class="look-tag">${look.occasion}</span>
                            <span class="look-tag">${look.season}</span>
                        </div>
                    </div>
                `;
                
                looksGrid.appendChild(lookElement);
            });
        } else {
            // Looks recomendados padrão (simulação)
            const defaultLooks = [
                {
                    name: 'Look Casual para o Dia',
                    occasion: 'casual',
                    season: 'summer',
                    description: 'Perfeito para um dia descontraído'
                },
                {
                    name: 'Look Elegante para Trabalho',
                    occasion: 'work',
                    season: 'all',
                    description: 'Profissional e estiloso'
                },
                {
                    name: 'Look para Festa Noturna',
                    occasion: 'party',
                    season: 'winter',
                    description: 'Brilhante e chamativo'
                },
                {
                    name: 'Look Romântico para Encontro',
                    occasion: 'date',
                    season: 'spring',
                    description: 'Delicado e encantador'
                }
            ];
            
            defaultLooks.forEach(look => {
                const lookElement = document.createElement('div');
                lookElement.className = 'look-card';
                lookElement.innerHTML = `
                    <div class="look-image">
                        <img src="https://via.placeholder.com/280x200/333333/FFFFFF?text=Look+${look.name.replace(/ /g, '+')}" alt="${look.name}">
                    </div>
                    <div class="look-details">
                        <h3>${look.name}</h3>
                        <p>${look.description}</p>
                        <div class="look-tags">
                            <span class="look-tag">${look.occasion}</span>
                            <span class="look-tag">${look.season}</span>
                        </div>
                    </div>
                `;
                
                looksGrid.appendChild(lookElement);
            });
        }
    }
    
    // Criar novo look
    saveLookBtn.addEventListener('click', function() {
        const lookName = document.getElementById('look-name').value;
        const lookOccasion = document.getElementById('look-occasion').value;
        const lookSeason = document.getElementById('look-season').value;
        
        if (!lookName) {
            alert('Por favor, dê um nome ao seu look.');
            return;
        }
        
        const newLook = {
            id: Date.now(),
            name: lookName,
            occasion: lookOccasion,
            season: lookSeason,
            items: [] // Nesta versão simplificada, não estamos realmente vinculando itens
        };
        
        savedLooks.push(newLook);
        localStorage.setItem('savedLooks', JSON.stringify(savedLooks));
        
        alert('Look criado com sucesso!');
        createLookModal.style.display = 'none';
        loadRecommendedLooks();
    });
    
    // Trocar abas de lojas
    document.querySelectorAll('.store-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.store-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            searchClothing(); // Refazer a pesquisa ao trocar de loja
        });
    });
    
    // Inicialização
    loadWardrobeItems();
    
    // Simular clique na aba Shein ao carregar a página de pesquisa
    searchBtn.addEventListener('click', function() {
        setTimeout(() => {
            document.querySelector('.store-tab[data-store="shein"]').click();
        }, 100);
    });
});
